import ImageKit from "imagekit";

interface ImageKitInterface {
  publicKey: string;
  privateKey: string;
  urlEndpoint: string;
}

const imagekit: ImageKitInterface = {
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
};

const imagekitInstance = new ImageKit(imagekit);

export default imagekitInstance;
