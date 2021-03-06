export interface IPool {
	title: string
	media: string
}

export interface IReward {
	amount: string
	startDateTs: number
	endDateTs: number
}

export interface IFarm {
	beneficiary_reward: string
	claimed_reward: string
	cur_round: number
	farm_id: string
	farm_kind: string
	farm_status: string
	last_round: number
	media: string
	reward_per_session: any
	reward_token: any
	seed_id: string
	session_interval: number
	start_at: number
	title: string
	total_reward: any
	unclaimed_reward: string
}

export interface IProfile {
	accountId?: string
	imgUrl?: string
}

export interface IFTMetadata {
	symbol: string
	decimals: number
}
