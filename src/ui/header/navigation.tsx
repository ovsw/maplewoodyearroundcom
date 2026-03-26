import { getSite } from '@/sanity/lib/queries'
import type { LinkList, Megamenu as MegamenuType } from '@/sanity/types'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'
import Dropdown from './dropdown'
import Megamenu from './megamenu'

export default async function Navigation() {
	const site = await getSite()

	return (
		<nav className="max-md:header-not-open:hidden max-md:anim-fade-to-b flex gap-x-4 [grid-area:navigation] max-md:my-4 max-md:flex-col">
			{site?.header?.items?.map((item) => {
				switch (item._type) {
					case 'link':
						return (
							<SanityLink
								link={item as SanityLinkType}
								className="link"
								key={item._key}
							/>
						)

					case 'link.list':
						return <Dropdown {...(item as LinkList)} key={item._key} />

					case 'megamenu':
						return <Megamenu {...(item as MegamenuType)} key={item._key} />

					default:
						return null
				}
			})}
		</nav>
	)
}
