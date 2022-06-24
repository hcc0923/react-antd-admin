import React from 'react';
import { FullscreenOutlined } from '@ant-design/icons';


class FullScreen extends React.Component {
	state = {
		isFullScreen: false
	};
	handleRequestFullScreen = () => {
		let de = document.documentElement;
		if (de.requestFullscreen) {
			de.requestFullscreen();
		} else if (de.mozRequestFullScreen) {
			de.mozRequestFullScreen();
		} else if (de.webkitRequestFullScreen) {
			de.webkitRequestFullScreen();
		};
	};
	handleExitFullscreen = () => {
		let de = document;
		if (de.exitFullscreen) {
			de.exitFullscreen();
		} else if (de.mozCancelFullScreen) {
			de.mozCancelFullScreen();
		} else if (de.webkitCancelFullScreen) {
			de.webkitCancelFullScreen();
		};
	};
	handleFullScrren = () => {
		this.state.isFullScreen ? this.handleExitFullscreen() : this.handleRequestFullScreen();
	};
	handleWatchFullScreen = () => {
		document.addEventListener(
			'fullscreenchange',
			() => {
				this.setState({ isFullScreen: document.fullscreenElement });
			},
			false
		);
		document.addEventListener(
			'mozfullscreenchange',
			() => {
				this.setState({ isFullScreen: document.mozFullScreen });
			},
			false
		);
		document.addEventListener(
			'webkitfullscreenchange',
			() => {
				this.setState({ isFullScreen: document.webkitIsFullScreen });
			},
			false
		);
	};
	componentDidMount() {
		this.handleWatchFullScreen();
	};
	componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    };
	render() {
		return (
			<FullscreenOutlined 
				style={{ fontSize: '20px', cursor: 'pointer' }} 
				onClick={this.handleFullScrren} 
			/>
		);
	};
};


export default FullScreen;