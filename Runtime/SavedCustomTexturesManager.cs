using System;
using System.Collections.Generic;
using System.IO;
using SpellBoundAR.SavedAssetsSystem;
using SpellBoundAR.SaveSystem;
using UnityEngine;

namespace SpellBoundAR.CustomTextures
{
    public class SavedCustomTexturesManager : ISavedCustomTexturesManager
    {
        [Header("Cache")]
        private readonly PathData _pathData;
        private readonly PathData[] _historicalPathData;
        
        public Dictionary<string, SavedCustomTexture> CustomTextures { get; } = new ();

        public SavedCustomTexture GetSavedCustomTexture(string id)
        {
            return CustomTextures.ContainsKey(id) ? CustomTextures[id] : null;
        }

        public SavedCustomTexture CreateNewSavedCustomTexture()
        {
            string id = Guid.NewGuid().ToString();
            SavedCustomTexture savedCustomTextureTexture = new SavedCustomTexture(new PathData(1, Path.Combine(_pathData.Directory, id), string.Empty, FileType.PNG), null);
            CustomTextures.Add(id, savedCustomTextureTexture);
            return savedCustomTextureTexture;
        }

        public Texture2D LoadTexture(string filename)
        {
            return SaveSystem.SaveSystem.LoadTexture(_pathData.Directory, filename + _pathData.FileExtension);
        }

        public bool RenameTexture(string oldName, string newName)
        {
            return SaveSystem.SaveSystem.RenameTexture(
                _pathData.Directory,
                oldName + _pathData.FileExtension,
                newName + _pathData.FileExtension);
        }

        public string[] GetAllTextures() => SaveSystem.SaveSystem.GetFilesOfTypeIn(_pathData.Directory, FileType.PNG);

        public void DeleteSavedCustomTexture(string id)
        {
            SaveSystem.SaveSystem.DeleteDirectory(Path.Combine(_pathData.Directory, id));
        }

        public SavedCustomTexturesManager(PathData pathData, params PathData[] historicalPathData)
        {
            _pathData = pathData;
            _historicalPathData = historicalPathData;

            DirectoryInfo[] directories = SaveSystem.SaveSystem.GetDirectoryInfo(_pathData.Directory);
            foreach (DirectoryInfo directory in directories)
            {
                CustomTextures.Add(
                    directory.Name,
                    new SavedCustomTexture(new PathData(1, Path.Combine(_pathData.Directory, directory.Name), string.Empty, FileType.Txt), null));
            }
        }
    }
}