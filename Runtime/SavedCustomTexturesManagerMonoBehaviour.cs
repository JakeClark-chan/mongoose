using System.Collections.Generic;
using SpellBoundAR.SavedAssetsSystem;
using SpellBoundAR.SaveSystem;
using UnityEngine;

namespace SpellBoundAR.CustomTextures
{
    public class SavedCustomTexturesManagerMonoBehaviour : MonoBehaviour, ISavedCustomTexturesManager
    {
        [Header("Settings")]
        [SerializeField] private string directory;

        public SavedCustomTexturesManager SavedCustomTexturesManager { get; private set; }

        public Dictionary<string, SavedCustomTexture> CustomTextures => SavedCustomTexturesManager.CustomTextures;

        public SavedCustomTexture CreateNewSavedCustomTexture() => SavedCustomTexturesManager.CreateNewSavedCustomTexture();

        public SavedCustomTexture GetSavedCustomTexture(string id) => SavedCustomTexturesManager.GetSavedCustomTexture(id);

        public void DeleteSavedCustomTexture(string id) => SavedCustomTexturesManager.DeleteSavedCustomTexture(id);

        private void Awake()
        {
            SavedCustomTexturesManager = new SavedCustomTexturesManager(new PathData(1, directory, string.Empty, FileType.Txt));
        }
    }
}