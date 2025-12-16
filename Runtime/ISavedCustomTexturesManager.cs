using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace SpellBoundAR.CustomTextures
{
    public interface ISavedCustomTexturesManager
    {
        public Dictionary<string, SavedCustomTexture> CustomTextures { get; }

        public SavedCustomTexture CreateNewSavedCustomTexture();
        public SavedCustomTexture GetSavedCustomTexture(string id);
        public void DeleteSavedCustomTexture(string id);
    }
}
