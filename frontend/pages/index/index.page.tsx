import React from "react";
import { Counter } from "./Counter";
import styled from "styled-components";

export { Page };

const Container = styled.div`
	width: 100%;
	background-color: red;
`;

function Page() {
	return (
		<Container>
			<h1>Welcome</h1>
			This page is:
			<ul>
				<li>Rendered to HTML.</li>
				<li>
					Interactive. <Counter />
				</li>
			</ul>
		</Container>
	);
}

/**
 *
 Title tags
Meta description tags
Ecommerce product pages
Landing pages
Image alt text
Category pages
 */
