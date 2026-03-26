'use client'

import { defineField, defineType, type StringInputProps } from 'sanity'
import { Box, Button, Flex, Text, TextInput } from '@sanity/ui'
import { useState } from 'react'
import { VscCheck, VscCopy } from 'react-icons/vsc'

function ModuleAttributesInput({ elementProps, path, value }: StringInputProps) {
	const pathSegment = path[1]
	const moduleKey =
		typeof pathSegment === 'object' &&
		pathSegment !== null &&
		'_key' in pathSegment &&
		typeof pathSegment._key === 'string'
			? pathSegment._key
			: undefined
	const [checked, setChecked] = useState(false)

	return (
		<Flex align="center" gap={1}>
			<Text muted>#</Text>

			<Box flex={1}>
				<TextInput {...elementProps} placeholder={`module-${moduleKey}`} />
			</Box>

			<Button
				title="Click to copy"
				mode="ghost"
				icon={checked ? VscCheck : VscCopy}
				disabled={checked}
				onClick={() => {
					navigator.clipboard.writeText('#' + (value || `module-${moduleKey}`))

					setChecked(true)
					setTimeout(() => setChecked(false), 1000)
				}}
			/>
		</Flex>
	)
}

export default defineType({
	name: 'module-attributes',
	title: 'Module attributes',
	type: 'object',
	fields: [
		defineField({
			name: 'uid',
			title: 'Unique identifier',
			description: (
				<>
					Used for anchor/jump links (HTML <code>id</code> attribute).
				</>
			),
			type: 'string',
			validation: (Rule) =>
				Rule.regex(/^[a-zA-Z0-9-]+$/g).error(
					'Must not contain spaces or special characters',
				),
			components: {
				input: ModuleAttributesInput,
			},
		}),
		defineField({
			name: 'hidden',
			type: 'boolean',
			description: 'Hide the module from the page',
			initialValue: false,
		}),
	],
})
