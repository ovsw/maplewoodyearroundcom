import { stegaClean } from 'next-sanity'
import type { Cta } from '@/sanity/types'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'
import { moduleAttributes, type ModuleProps } from '.'

type HeroVideo = ModuleProps & {
	_type?: 'hero.video'
	heading?: string
	highlightText?: string
	description?: string
	ctas?: (Cta & { _key?: string })[]
	videoMp4Url?: string
	videoWebmUrl?: string
	posterUrl?: string
	overlayOpacity?: number
}

const CTA_BASE_CLASS =
	'inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200'

const CTA_STYLE_CLASSES = [
	`${CTA_BASE_CLASS} bg-white text-slate-900 hover:bg-white/90`,
	`${CTA_BASE_CLASS} border border-white/80 text-white hover:bg-white/10`,
]

function getHeading({
	heading,
	highlightText,
}: Pick<HeroVideo, 'heading' | 'highlightText'>) {
	const cleanHeading = stegaClean(heading)
	const cleanHighlightText = stegaClean(highlightText)

	if (!cleanHeading) return null

	if (!cleanHighlightText || !cleanHeading.includes(cleanHighlightText)) {
		return (
			<h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
				{cleanHeading}
				{cleanHighlightText ? (
					<>
						<br />
						<span className="text-amber-300">{cleanHighlightText}</span>
					</>
				) : null}
			</h1>
		)
	}

	const [before, ...rest] = cleanHeading.split(cleanHighlightText)
	const after = rest.join(cleanHighlightText)

	return (
		<h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
			{before}
			<span className="text-amber-300">{cleanHighlightText}</span>
			{after}
		</h1>
	)
}

export default function ({
	heading,
	highlightText,
	description,
	ctas,
	videoMp4Url,
	videoWebmUrl,
	posterUrl,
	overlayOpacity,
	...props
}: HeroVideo) {
	const overlayValue =
		typeof overlayOpacity === 'number'
			? Math.min(1, Math.max(0, overlayOpacity))
			: 0.45

	return (
		<section
			className="relative full-bleed w-screen min-h-screen overflow-hidden"
			{...moduleAttributes(props)}
		>
			{videoMp4Url ? (
				<video
					className="absolute inset-0 h-full w-full object-cover"
					autoPlay
					loop
					muted
					playsInline
					poster={stegaClean(posterUrl)}
					aria-hidden
				>
					{videoWebmUrl ? (
						<source src={stegaClean(videoWebmUrl)} type="video/webm" />
					) : null}
					<source src={stegaClean(videoMp4Url)} type="video/mp4" />
				</video>
			) : null}

			<div
				className="absolute inset-0 bg-slate-950"
				style={{ opacity: overlayValue }}
				aria-hidden
			/>

			<div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-6 py-24 text-center md:px-10">
				<header className="space-y-6">
					{getHeading({ heading, highlightText })}

					{description ? (
						<p className="mx-auto max-w-3xl text-pretty text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
							{stegaClean(description)}
						</p>
					) : null}

					{ctas?.length ? (
						<div className="flex flex-wrap items-center justify-center gap-3 pt-2">
							{ctas.slice(0, 2).map((cta, index) => (
								<SanityLink
									key={cta._key}
									link={cta.link as SanityLinkType}
									className={CTA_STYLE_CLASSES[index] ?? CTA_STYLE_CLASSES[1]}
								/>
							))}
						</div>
					) : null}
				</header>
			</div>
		</section>
	)
}
