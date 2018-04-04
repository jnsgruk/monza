const datafile = {
	state: {
		aps: [],
		clients: [],
		bridged: [],
		other: [],
		probes: []
	},
	
	reducers: {
		// Take a JSON object for config and update the state
		update(state, payload) {
			const { aps, clients, bridged, other, probes } = payload
			return { aps, clients, bridged, other, probes }
		}
	},
	effects: {
		
	}
}
export default datafile

