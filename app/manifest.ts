import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'PlaceIndex',
        short_name: 'PlaceIndex',
        description: 'Real Estate Market Intelligence & Area Investment Index',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/white-logo.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            },
        ],
    }
}
