import React, { useEffect } from 'react'
import hljs from 'highlight.js'
import { motion } from 'framer-motion'
import Meta from '@components/Meta'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Error404PageTemplate from '@components/Error404PageTemplate'
import { Snippet } from '@contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'

const SnippetDetailPage = ({ snippet }: { snippet: Snippet }) => {
	const router = useRouter()
	const Component = useMDXComponent(snippet.body.code)

	const updateCodeSyntaxHighlighting = () => {
		document.querySelectorAll('pre code').forEach((block: any) => {
			hljs.highlightBlock(block)
		})
	}

	useEffect(() => {
		updateCodeSyntaxHighlighting()
	})

	return (
		<motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='bg-gray-100'>
			<Meta title={snippet.title} description={snippet.title} image={snippet.icon} url={`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`} />
			<main className='bg-purple-200 pb-12 bg-dots min-h-screen'>
				<Header />
				<div className='container mx-auto px-4 max-w-screen-xl'>
					<div className='flex space-x-4 justify-center'>
						<div className='w-full lg:w-9/12 mt-24'>
							<div className='text-center py-12'>
								<h1 className='text-4xl md:text-5xl font-black title-front'>{snippet.title}</h1>
								<p className='mt-4 text-sm md:text-base lg:text-lg font-medium text-gray-800'>{snippet.description}</p>
							</div>
							<div className='bg-gray-100 rounded-xl border-4 border-gray-800 text-black font-medium'>
								<div className='px-4 py-2 flex gap-2 bg-orange-400 rounded-t-lg border-b-4 border-gray-800'>
									<Link href='/snippets'>
										<a>
											<div className='h-4 w-4 rounded-full bg-red-500 '></div>
										</a>
									</Link>
									<div className='h-4 w-4 rounded-full bg-yellow-300 '></div>
									<div className='h-4 w-4 rounded-full bg-green-400 '></div>
								</div>

								<article>
									<div className='px-6 md:px-12 py-8'>
										<div className='post-wrapper relative'>
											<Component />
										</div>
									</div>
								</article>
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</motion.div>
	)
}

export default SnippetDetailPage
