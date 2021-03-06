import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";

const CacheImage = ({ uri, style }) => {
  const [source, setSource] = useState(null);

  useEffect(() => {
    const fetchCache = async () => {
      const name = shorthash.unique(uri);
      const path = `${FileSystem.cacheDirectory}${name}`;
      const image = await FileSystem.getInfoAsync(path);
      if (image.exists) {
        setSource({ uri: image.uri });
        return;
      }

      const newImage = await FileSystem.downloadAsync(uri, path);
      setSource({ uri: newImage.uri });
    };
    fetchCache();
    return;
  }, []);

  return <Image source={source} style={style} />;
};

export default CacheImage;
