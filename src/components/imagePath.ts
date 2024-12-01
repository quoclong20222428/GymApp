export default function getImagePath (imageName: string) {
    const image: { [key: string]: any } = {
        body0: require('../image/body0.png'),
        body1: require('../image/body1.png'),
        body2: require('../image/body2.png'),
        body3: require('../image/body3.png'),
        body4: require('../image/body4.png'),
        body5: require('../image/body5.png'),
        body6: require('../image/body6.png'),
        body7: require('../image/body7.png'),
        body8: require('../image/body8.png'),
        // Add other icons here
    };

    return image[imageName] || null;
}