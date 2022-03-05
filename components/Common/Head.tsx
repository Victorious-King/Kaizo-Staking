import NextHead from 'next/head'

interface HeadProps {
	title?: string
	description?: string
	image?: string
	url?: string
	keywords?: string
}

const Head = ({
	title = 'Kaizo NFT Staking',
	description = 'Stake your $Kaizo Fighters and earn rewards with $Dojo',
	image = '',
	url = 'http://localhost:3000',
	keywords = 'stake, blockchain, near, kaizo',
}: HeadProps) => {
	const _title = title === 'Kaizo NFT Staking' ? 'Kaizo NFT Staking' : `${title} - Kaizo NFT Staking`

	return (
		<NextHead>
			<title>{_title}</title>
			<meta name="title" content={_title} />
			<meta name="description" content={description} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={url} />
			<meta property="og:title" content={_title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			<meta name="keywords" content={keywords} />
			<meta name="robots" content="index, follow" />
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={url} />
			<meta property="twitter:title" content={_title} />
			<meta property="twitter:description" content={description} />
			<meta property="twitter:image" content={image} />
		</NextHead>
	)
}

export default Head
