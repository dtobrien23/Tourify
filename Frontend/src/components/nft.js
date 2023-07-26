import { NFTStorage } from "nft.storage";

const cleanupIPFS = (url) => {
    if(url.includes("ipfs://")) {
      return url.replace("ipfs://", "https://ipfs.io/ipfs/")
    }
  }
  

const uploadArtToIpfs = async () => {
  try {

    const nftstorage = new NFTStorage({
			token: process.env.REACT_APP_NFT_STORAGE,
		})

    const store = await nftstorage.store({
      name: "badge name", //badge name from json url
      description: 'badge name', //generate description or use name again
      image: 'badge image path' // badge image url
    })

    return cleanupIPFS(store.data.image.href)


  } catch(err) {
    console.log(err)
  }
}

const mintNft = async () => {
	try {
		const imageURL = await uploadArtToIpfs();

		// mint as an NFT on nftport
		const response = await axios.post(
			`https://api.nftport.xyz/v0/mints/easy/urls`,
			{
				file_url: imageURL,
				chain: "polygon",
				name: "Sample NFT",
				description: "Build with NFTPort!",
				mint_to_address: "0xA649D68a977AB4d4Ab3ddd275aC3a84D03889Ee4",
			},
      {
        headers: {
          Authorization: process.env.REACT_APP_NFT_PORT,
        }
      }
		);
		const data = await response.data;
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};





