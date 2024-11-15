export default function getIconPath (iconName: string) {
    const icons: { [key: string]: any } = {
        Facebook: require('../image/Fb.png'),
        Google: require('../image/Gg.png'),
        Apple: require('../image/Apple.png'),
        Github: require('../image/Gh.png'),
        // Add other icons here
    };

    return icons[iconName] || null;
}