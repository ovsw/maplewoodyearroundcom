import { stegaClean } from 'next-sanity'
import type {
	BLOG_POST_QUERY_RESULT,
	ModuleAttributes,
	PAGE_QUERY_RESULT,
} from '@/sanity/types'
import AccordionList from './accordion-list'
import BlogIndex from './blog/blog-index'
import BlogPostContent from './blog/blog-post-content'
import BlogPostList from './blog/blog-post-list'
import Breadcrumbs from './breadcrumbs'
import Callout from './callout'
import CardList from './card-list'
import CustomHTML from './custom-html'
import HeroSplit from './hero.split'
import HeroVideo from './hero.video'
import HeroVideoZoomGrid from './hero.video-zoom-grid'
import LogoList from './logo-list'
import PersonList from './person-list'
import Prose from './prose'
import QuoteList from './quote-list'
import SearchModule from './search'
import StatList from './stat-list'
import StepList from './step-list'

const MODULES_MAP = {
	'accordion-list': AccordionList,
	'blog-index': BlogIndex,
	'blog-post-content': BlogPostContent,
	'blog-post-list': BlogPostList,
	breadcrumbs: Breadcrumbs,
	callout: Callout,
	'card-list': CardList,
	'custom-html': CustomHTML,
	'hero.split': HeroSplit,
	'hero.video': HeroVideo,
	'hero.video-zoom-grid': HeroVideoZoomGrid,
	'logo-list': LogoList,
	'person-list': PersonList,
	prose: Prose,
	'quote-list': QuoteList,
	'search-module': SearchModule,
	'stat-list': StatList,
	'step-list': StepList,
} as const

export default function ({
	page,
	post,
}: {
	page?: PAGE_QUERY_RESULT
	post?: BLOG_POST_QUERY_RESULT
}) {
	const modules = [page, post].flatMap((item) => item?.modules ?? [])

	const moduleSpecificProps = (module: ModuleProps) => {
		switch (module._type) {
			case 'blog-post-content':
				return { post }
			case 'breadcrumbs':
				return { currentPage: page || post }
			default:
				return {}
		}
	}

	return (
		<>
			{modules?.map((module) => {
				if (!module) return null

				const Module = MODULES_MAP[
					module._type as keyof typeof MODULES_MAP
				] as React.ComponentType

				if (!Module) return null

				return (
					<Module
						{...module}
						{...moduleSpecificProps(module)}
						key={module._key}
					/>
				)
			})}
		</>
	)
}

export type ModuleProps = Partial<
	NonNullable<
		NonNullable<PAGE_QUERY_RESULT | BLOG_POST_QUERY_RESULT>['modules']
	>[number]
> & { attributes?: ModuleAttributes }

export function moduleAttributes({ _key, _type, attributes }: ModuleProps) {
	return {
		id: stegaClean(attributes?.uid) || `module-${_key}`,
		'data-module': _type,
		hidden: attributes?.hidden,
	}
}
