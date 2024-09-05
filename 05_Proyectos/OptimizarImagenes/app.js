import fse, { outputFile } from "fs-extra";
import imagemin from "imagemin";
import imageminGifsicle from "imagemin-gifsicle";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";
import sharp from "sharp";

let inputFolder = "src";
let outputFolder = "opt";
let targetWidth = 1920;

const processImg = async () => {
  try {
    const files = await fse.readdir(inputFolder);

    for (const file of files) {
      let inputPath = `${inputFolder}/${file}`;
      let outputPath = `${outputFolder}/${file}`;

      //await sharp(inputPath).resize(targetWidth).toFile(outputPath);
      await sharp(inputPath).toFile(outputPath);

      await imagemin([outputPath], {
        destination: outputFolder,
        plugins: [
          imageminJpegtran({ quality: 80 }),
          imageminPngquant(),
          imageminSvgo(),
          imageminSvgo(),
          imageminWebp({ quality: 80 }),
          imageminGifsicle(),
        ],
      });

      console.log(`se ha optimizado imagen ${file}`);
    }
  } catch (error) {
    console.log(error);
  }
};

processImg();
