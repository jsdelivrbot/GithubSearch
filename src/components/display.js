import React, { Component } from 'react';

export default class Display extends Component {
	constructor(props)
	{
		super(props);
		this.state = {
			content: this.props.array,
			property : this.props.property
		}
		this.handelClickEvent = this.handelClickEvent.bind(this);
		this.handelSortTypeChange = this.handelSortTypeChange.bind(this);
	}

	componentWillReceiveProps(nextProps)
	{
		this.setState({
			content : nextProps.array,
			property : nextProps.property
		})
		console.log(nextProps.array,"See here")
	}

	handelClickEvent(i)
	{
		this.props.handelClickEvent(i);
		console.log("dsfmk",i);
	}

	handelSortTypeChange(e)
	{
		console.log(e.target.value);
		this.props.handelSortTypeChange(e.target.value);
	}

	render(){
		var displayContent = [];
		displayContent.push(<hr></hr>);
		displayContent.push(<div className="container"><span style={{float:"left",fontSize:"20px"}}>Full Name of Repo</span><span style={{float:"right",fontSize:"20px"}}>{this.state.property}</span></div>);
		displayContent.push(<hr></hr>);
		for(let i =0 ; i < this.state.content.length ;i++ )
		{
			displayContent.push(<div className="container"><span style={{float:"left"}}><a href="#" onClick={(e)=>this.handelClickEvent(i)}>{this.state.content[i]["fullName"]}</a></span><span style={{float:"right"}}>{this.state.content[i][this.state.property]}</span></div>);
			displayContent.push(<hr style={{width:"95%"}}></hr>)
		}
		console.log(displayContent);
		if(this.state.content.length){
			return(
				<div><br/><br/>
				<div>
				<pre>Sort By   
					<select name="sortType" onChange={(e)=>this.handelSortTypeChange(e)}>
						<option value="Score Dsc.">Score Dsc.</option>
				        <option value="Score Asc.">Score Asc.</option>
				        <option value="Stars Asc.">Stars Asc.</option>
				        <option value="Stars Dsc.">Stars Dsc.</option>
				        <option value="Forks Dsc.">Forks Dsc.</option>
				        <option value="Forks Asc.">Forks Asc.</option>
				        <option value="repoName">Repo Name</option>
				        <option value="fullName">Repo Full Name</option>
				        <option value="username">Username</option>
				    </select>
				</pre>
				</div>
					<div className = "container">
						{displayContent}
					</div>
				</div>
			)
		}
		else
		{
			return(<div></div>)
		}
	}
}