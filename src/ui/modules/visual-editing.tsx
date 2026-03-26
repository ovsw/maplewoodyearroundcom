import { VisualEditing as SanityVisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { SanityLive } from '@/sanity/lib/live'
import HoverDetails from '@/ui/hover-details'

export default async function VisualEditing() {
	return (
		<>
			<SanityLive />

			{(await draftMode()).isEnabled && (
				<>
					<SanityVisualEditing />

					<HoverDetails className="accordion fixed right-0 bottom-0 bg-amber-200/60 backdrop-blur-xs">
						<summary className="px-4 py-2">🚧 Draft mode</summary>

						<menu className="p-4 pt-0">
							<li>
								<Link href="/api/draft-mode/disable" className="link">
									Exit draft mode
								</Link>
							</li>
							<li>
								<Link href="/admin" className="link">
									Open the Studio
								</Link>
							</li>
						</menu>
					</HoverDetails>
				</>
			)}
		</>
	)
}
