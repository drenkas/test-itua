import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './Store'
import MainPage from './Containers/MainPage'
import 'antd/dist/antd.css'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Provider store={store}>
					<div>
						<MainPage />
					</div>
				</Provider>
			</div>
		);
	}
}

export default App;
