// This is to expand on in the future...
// Eventually, Sources should take an array of VideoSource
// This way, we can use sources of any type
// We just happen to only use MP4 in IAGE because it's the most universal

export class VideoSource {
    src: string;
    type: string;
}