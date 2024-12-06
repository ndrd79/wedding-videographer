const sharp = require('sharp');
const path = require('path');

const inputPath = 'E:/Programas/Vanderoski/Logo.png';
const outputPath = path.join(__dirname, '../public/images/logo.png');

sharp(inputPath)
  .resize(300, null, { // width 300px, height auto
    withoutEnlargement: true,
    fit: 'contain'
  })
  .toFile(outputPath)
  .then(() => console.log('✅ Logo redimensionada com sucesso!'))
  .catch(err => console.error('❌ Erro:', err));
