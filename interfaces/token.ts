export interface INFToken {
	token_id: string
	owner_id: string
	metadata: {
		title: string
		description: string
		media: string
		media_hash: never
		copies: number
		issued_at: string
		expires_at: never
		starts_at: never
		updated_at: never
		extra: never
		reference: string
		reference_hash: never
	}
	royalty: { [key: string]: number }
	approved_account_ids: { [key: string]: number }
}
