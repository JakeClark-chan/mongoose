using System;
using SpellBoundAR.SavedAssetsSystem;
using UnityEngine;

namespace SpellBoundAR.CustomTextures
{
    [Serializable]
    public class SavedCustomTexture
    {
        public static event Action<SavedCustomTexture> OnAnyTexture2DChanged;
        public static event Action<SavedCustomTexture> OnAnyNameChanged;
        public static event Action<SavedCustomTexture> OnAnyTimestampChanged;

        [Header("Cache")]
        [SerializeField] private SavedTexture2D savedTexture2D;
        [SerializeField] private SavedString savedName;
        [SerializeField] private SavedString savedTimestamp;

        public PathData PathData { get; private set; }

        public Texture2D Texture2D
        {
            get => savedTexture2D.Texture2D;
            set => savedTexture2D.Texture2D = value;
        }
        
        public string Name
        {
            get => savedName.Value;
            set => savedName.Value = value;
        }

        public string Timestamp
        {
            get => savedTimestamp.Value;
            set => savedTimestamp.Value = value;
        }

        public void Save()
        {
            savedTexture2D.Save();
            savedName.Save();
            savedTimestamp.Save();
        }

        public Sprite CreateSprite()
        {
            Texture2D texture2D = Texture2D;
            if (!texture2D) return null;
            Rect rect = new Rect(0, 0, texture2D.width, texture2D.height);
            Vector2 pivot = new Vector2(.5f, .5f);
            Sprite sprite = Sprite.Create(texture2D, rect, pivot);
            sprite.name = PathData.Directory;
            return sprite;
        }

        public SavedCustomTexture(PathData pathData, Texture2D texture2D)
        {
            PathData = pathData;
            savedTexture2D = new (PathData.Directory, "Texture2D.png", texture2D, () => OnAnyTexture2DChanged?.Invoke(this));
            savedName = new (PathData.Directory, "Name.txt", PathData.FileName, () => OnAnyNameChanged?.Invoke(this));
            savedTimestamp = new(PathData.Directory, "Timestamp.txt", DateTime.Now.ToString("MM-dd-yyyy hh:mm:ss tt"), () => OnAnyTimestampChanged?.Invoke(this));
        }
    }
}
