import React, { useState } from 'react';
import { Image, useWebId, Value } from '@solid/react';
import './MyProfile.css';
import { BsBoxArrowUpRight } from 'react-icons/bs'
import FriendList from './FriendList.js';
import { getEmail } from '../../../solid/profileInfo.js'
import { Button, Badge } from 'react-bootstrap'




export default function MyProfile() {
	const [theEmail, setTheEmail] = useState("");

	const setAllStates = async () => {
		setTheEmail(await getEmail())
	};

	setAllStates();

	return (
		<div id="generalComponent">
			<div id="card">
				<div id="image-cropper">
					<Image src="user.vcard_hasPhoto" defaultSrc="profile.svg" id="profilePicture" />

				</div>

				<div id="allData">
					<div id="profileData">
						<h1>Hello, <b><Value src="user.name" /></b></h1>
						<p> {theEmail} </p>
						<p><Badge variant="dark"><Value src="user.vcard_role" />CEO</Badge></p>

						<a href={useWebId()}>Solid profile <BsBoxArrowUpRight></BsBoxArrowUpRight></a>
					</div>
					<div id="profileData">
						<Button variant="primary">
							Routes <Badge variant="light">4</Badge>
						</Button>
						<Button variant="primary">
							Shared routes <Badge variant="light">2</Badge>
						</Button>

					</div>

				</div>
				<FriendList id="friendList" />

			</div>

		</div>
	)
}
