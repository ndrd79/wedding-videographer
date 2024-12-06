const sharp = require('sharp');
const path = require('path');

const inputPath = 'E:/Programas/Vanderoski/Logo.png';
const outputDir = path.join(__dirname, '../public/images');

async function resizeLogo() {
  try {
    // Criar versão normal (altura 71px, mantendo proporção)
    await sharp(inputPath)
      .resize({ height: 71, withoutEnlargement: true })
      .toFile(path.join(outputDir, 'logo.png'));

    console.log('✅ Logo redimensionada com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao redimensionar a imagem:', error);
  }
}

resizeLogo();
