// import { NFTStorage } from "nft.storage";

// const [imageBlob, setImageBlob] = useState(null)

// const generateArt = async () => {
// 	try {
// 		const response = await axios.post(
// 			`https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5`,
// 			{
// 				headers: {
// 					Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE}}`,
// 				},
// 				method: "POST",
// 				inputs: prompt,
// 			},
// 			{ responseType: "blob" }
// 		);
// 		console.log(response);
// 		const url = URL.createObjectURL(response.data)
// 		// console.log(url)
// 		console.log(url)
// 		// Set state for image
//     setImageBlob(url)
// 	} catch (err) {
// 		console.log(err);
// 	}
// };








// const cleanupIPFS = (url) => {
//     if(url.includes("ipfs://")) {
//       return url.replace("ipfs://", "https://ipfs.io/ipfs/")
//     }
//   }
  


// // this uploads the art to blockchain storage
// const uploadArtToIpfs = async (badgeName) => {
//   try {
//     const nftstorage = new NFTStorage({
//       token: process.env.REACT_APP_NFT_STORAGE,
//     });
  
//     const imageBlob = await fetchImageAsBlob(`/images/badgeimages_test/${badgeName}.png`);
  
//     const file = new File([imageBlob], `${badgeName}.png`, { // Use badgeName as the image file name
//       type: "image/png", // Change this to the correct file type if needed (e.g., "image/png" for PNG images)
//     });
  
//     const store = await nftstorage.store({
//       name: `Badge - ${badgeName}`, 
//       description: `You got the ${badgeName} Badge!`, // generate description or use name again
//       image: file
//     });
//     console.log(file,'this is the blob file converted')
  
//     return cleanupIPFS(store.data.image.href);
//   } catch (err) {
//     console.log(err);
//     return null;
//   }

// const mintNft = async () => {
// 	try {
// 		const imageURL = await uploadArtToIpfs();

// 		// mint as an NFT on nftport
// 		const response = await axios.post(
// 			`https://api.nftport.xyz/v0/mints/easy/urls`,
// 			{
// 				file_url: imageURL,
// 				chain: "polygon",
// 				name: "Sample NFT",
// 				description: "Build with NFTPort!",
// 				mint_to_address: "0xA649D68a977AB4d4Ab3ddd275aC3a84D03889Ee4",
// 			},
//       {
//         headers: {
//           Authorization: process.env.REACT_APP_NFT_PORT,
//         }
//       }
// 		);
// 		const data = await response.data;
// 		console.log(data);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };





