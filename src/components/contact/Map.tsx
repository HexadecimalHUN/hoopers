'use client';

import React from 'react';

interface MapProps {
	lat?: number;
	lng?: number;
	zoom?: number;
	address?: string;
	className?: string;
}

export default function Map({ lat, lng, zoom = 15, address, className }: MapProps) {
	const query = address ? encodeURIComponent(address) : `${lat ?? ''},${lng ?? ''}`;
	const src = `https://www.google.com/maps?q=${query}&z=${zoom}&output=embed`;
	return (
		<div className={className ?? 'w-full h-[400px] rounded-xl overflow-hidden ring-1 ring-black/5'}>
			<iframe
				title="Map"
				src={src}
				className="w-full h-full border-0"
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
			/>
		</div>
	);
}
