import React from 'react';

interface LinkProps {
	children: any;
}
interface Link extends HTMLAnchorElement {}

export const Link: Link = ({ children, ...props }: LinkProps) => {
	return (
		<div className="transform p-1em text-white inline skew-x-12 bg-blue-500 dark:bg-blue-700 hover:bg-blue-300 dark:hover:bg-cyan-500 transition-colors">
			<a {...props}>
				{children}
			</a>
		</div >
	)
}
