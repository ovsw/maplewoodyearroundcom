import type { ComponentProps } from 'react'
import type { Breadcrumbs, Page } from '@/sanity/types'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'
import { moduleAttributes } from '.'

export default function ({
	crumbs,
	currentPage,
	...props
}: Breadcrumbs & { currentPage?: Page }) {
	return (
		<nav className="section py-4 text-sm" {...moduleAttributes(props)}>
			<ol
				className="flex items-center gap-x-2 gap-y-1"
				itemScope
				itemType="https://schema.org/BreadcrumbList"
			>
				{crumbs?.map((crumb, index) => (
					<Crumb
						link={crumb as SanityLinkType}
						position={index + 1}
						key={crumb._key}
					/>
				))}

				<Crumb position={(crumbs?.length ?? 0) + 2}>{currentPage?.title}</Crumb>
			</ol>
		</nav>
	)
}

function Crumb({
	link,
	position,
	children,
}: {
	position: number
	link?: Partial<ComponentProps<typeof SanityLink>['link']>
} & ComponentProps<'li'>) {
	const Content = (
		<>
			<span itemProp="name">
				{children || link?.label || link?.internal?.title}
			</span>
			<meta itemProp="position" content={position.toString()} />
		</>
	)

	return (
		<li
			className='line-clamp-1 not-first:before:mr-2 not-first:before:content-["/"] first:shrink-0'
			itemProp="itemListElement"
			itemScope
			itemType="https://schema.org/ListItem"
		>
			{link ? (
				<SanityLink
					link={link as SanityLinkType}
					className="link"
					itemProp="item"
				>
					{Content}
				</SanityLink>
			) : (
				Content
			)}
		</li>
	)
}
