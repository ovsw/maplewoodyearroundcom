import { defineField, defineType } from 'sanity'
import { VscDeviceCameraVideo } from 'react-icons/vsc'

export default defineType({
	name: 'hero.video',
	title: 'Hero (video)',
	type: 'object',
	icon: VscDeviceCameraVideo,
	groups: [
		{ name: 'content', default: true },
		{ name: 'video' },
		{ name: 'options' },
	],
	fields: [
		defineField({
			name: 'attributes',
			type: 'module-attributes',
			group: 'options',
		}),
		defineField({
			name: 'heading',
			type: 'string',
			validation: (rule) => rule.required(),
			group: 'content',
		}),
		defineField({
			name: 'highlightText',
			title: 'Highlighted text',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'description',
			type: 'text',
			rows: 3,
			group: 'content',
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			validation: (rule) => rule.max(2),
			group: 'content',
		}),
		defineField({
			name: 'videoMp4Url',
			title: 'Video MP4 URL',
			type: 'url',
			validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
			group: 'video',
		}),
		defineField({
			name: 'videoWebmUrl',
			title: 'Video WebM URL',
			type: 'url',
			validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
			group: 'video',
		}),
		defineField({
			name: 'posterUrl',
			title: 'Poster URL',
			type: 'url',
			validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
			group: 'video',
		}),
		defineField({
			name: 'overlayOpacity',
			type: 'number',
			initialValue: 0.45,
			validation: (rule) => rule.required().min(0).max(1),
			group: 'options',
		}),
	],
	preview: {
		select: {
			title: 'heading',
		},
		prepare: ({ title }) => ({
			title: title || 'Video hero',
			subtitle: 'Hero (video)',
			media: VscDeviceCameraVideo,
		}),
	},
})
