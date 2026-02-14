import { defineField } from 'sanity'

export default ({ of = [] }: { of?: Array<{ type: string }> } = {}) =>
	defineField({
		name: 'modules',
		type: 'array',
		of: [
			{ type: 'accordion-list' },
			{ type: 'blog-index' },
			{ type: 'blog-post-list' },
			{ type: 'breadcrumbs' },
			{ type: 'callout' },
			{ type: 'card-list' },
			{ type: 'custom-html' },
			{ type: 'hero.split' },
			{ type: 'logo-list' },
			{ type: 'person-list' },
			{ type: 'prose' },
			{ type: 'quote-list' },
			{ type: 'search-module' },
			{ type: 'stat-list' },
			{ type: 'step-list' },
			...of,
		],
		options: {
			insertMenu: {
				groups: [
					{
						name: 'blog',
						of: ['blog-index', 'blog-post-content', 'blog-post-list'],
					},
				],
			},
		},
	})
