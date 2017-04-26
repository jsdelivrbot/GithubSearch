import React, { Component } from 'react';
import axios from 'axios';
import Display from "./display";

export default class App extends Component {
	constructor(props)
	{
		super(props);
		this.state = {
			searchKeyWord : '',
			sortType: "score",
			display: [],
			detailedDisplay:'none',
			searchDisplay: '',
			repoNumberForDetailedDisplay: '',
			loading: false
		}
		this.onChangeKeyWord = this.onChangeKeyWord.bind(this); 
		this.onClickSubmit = this.onClickSubmit.bind(this);
		this.handelClickEvent = this.handelClickEvent.bind(this);
		this.onClickBackButton = this.onClickBackButton.bind(this);
		this.handelSortTypeChange = this.handelSortTypeChange.bind(this);
	}

	onChangeKeyWord(e)
	{
		// console.log(e.target.value);
		this.setState({
			searchKeyWord : e.target.value
		})
	}

	onClickSubmit()
	{
		// console.log(this.state.searchKeyWord,"clicked");
		this.setState({
			loading:true
		})
		var url1 = "https://api.github.com/search/repositories?q=";
		url1 = url1.concat(this.state.searchKeyWord);
		axios({
			method:'get',
			url : url1
		})
		.then(function (response){
			// console.log(response.data.items);
			var x = [];
			var y = response.data.items;
			for(let i = 0 ; i < y.length ; i++)
			{
				let z = {};
				z["fullName"] = y[i]["full_name"];
				z["username"] = y[i]["owner"]["login"];
				z["repoName"] = y[i]["name"];
				z["repoLink"] = y[i]["html_url"];
				z["stars"] = y[i]["stargazers_count"];
				z["watches"] = y[i]["watchers_count"];
				z["forks"] = y[i]["forks_count"];
				z["score"] = y[i]["score"];
				x.push(z);
			}
			this.setState({
				sortType: "score",
				display: x,
				detailedDisplay:'none',
				searchDisplay: '',
				repoNumberForDetailedDisplay: '',
				loading: false
			})
			console.log("Everything perfect",x);
		}.bind(this))
	}

	handelClickEvent(e)
	{
		this.setState({
			repoNumberForDetailedDisplay: e,
			searchDisplay: 'none',
			detailedDisplay: ''
		})
	}

	onClickBackButton(){
		this.setState({
			searchDisplay: '',
			detailedDisplay: 'none',
			repoNumberForDetailedDisplay: ''
		})
	}

	compareStarsAsc(a,b)
	{
		return a.stars>b.stars;
	}

	compareStarsDsc(a,b)
	{
		return a.stars<b.stars;
	}

	compareScoreDsc(a,b)
	{
		return a.score<b.score;
	}

	compareScoreAsc(a,b)
	{
		return a.score>b.score;
	}

	compareForksDsc(a,b)
	{
		return a.forks<b.forks;
	}

	compareForksAsc(a,b)
	{
		return a.forks>b.forks;
	}
	compareRepoName(a,b)
	{
		return a.repoName>b.repoName;
	}

	compareFullName(a,b)
	{
		return a.fullName>b.fullName;
	}
	compareUsername(a,b)
	{
		return a.username>b.username;
	}
	handelSortTypeChange(e){
		var x = this.state.display;
		if(e=="Stars Asc.")
		{
			x.sort(this.compareStarsAsc);
			e="stars";
		}
		else if(e=="Stars Dsc.")
		{
			x.sort(this.compareStarsDsc);
			e="stars";
		}
		else if(e=="Score Dsc.")
		{
			x.sort(this.compareScoreDsc);
			e="score";
		}
		else if(e=="Score Asc.")
		{
			x.sort(this.compareScoreAsc);
			e="score";
		}
		else if(e=="Forks Dsc.")
		{
			x.sort(this.compareForksDsc);
			e="forks";
		}
		else if(e=="Forks Asc.")
		{
			x.sort(this.compareForksAsc);
			e="forks";
		}
		else if(e=="repoName")
		{
			x.sort(this.compareRepoName);
		}
		else if(e=="fullName")
		{
			x.sort(this.compareFullName);
		}
		else if(e=="username")
		{
			x.sort(this.compareUsername);
		}
		this.setState({
			display:x,
			sortType:e
		})
	}

  	render() {
  		if(this.state.searchDisplay!="none")
  		{
	    	return (
		      	<div>
			      	<div style={{display:this.state.searchDisplay}}>
			      		<div className="container" style={{textAlign:"center",padding:"20px"}}>Welcome To the Github Search</div>

			      		<div className="container">
			      			<div className="col-sm-10">
			      				<input type="text" className="form-control input-sm" maxLength="64" onChange={this.onChangeKeyWord} placeholder="Search" />
			      			</div>
			      			<div className="col-sm-2">
			      				<button className="btn btn-primary" onClick={this.onClickSubmit}>Submit</button>
			      			</div>
			      		</div>
			      		<div style={{textAlign:"center"}}>{this.state.loading ? "Loading ... ":""}</div>
			      		<div className="container">
			      			<Display array = {this.state.display} property={this.state.sortType} handelClickEvent={this.handelClickEvent} handelSortTypeChange={this.handelSortTypeChange}/>
			      		</div>
			      	</div>
			    </div>
		    )
		}
		else
		{
			return (
				<div>
			      	<div style={{display:this.state.detailedDisplay}}>
			      		<div className="container" style={{paddingTop:"20px"}}>
			      			<button type="button" className="btn btn-danger" onClick={this.onClickBackButton}>Back</button>
			      			<br/>
			      			Username : {this.state.display[this.state.repoNumberForDetailedDisplay]["username"]}
			      			<br/>
			      			Full Name : {this.state.display[this.state.repoNumberForDetailedDisplay]["fullName"]}
			      			<br/>
			      			Repo Name : {this.state.display[this.state.repoNumberForDetailedDisplay]["repoName"]}
			      			<br/>
			      			Repo Link : <a href={this.state.display[this.state.repoNumberForDetailedDisplay]["repoLink"]}>{this.state.display[this.state.repoNumberForDetailedDisplay]["repoLink"]}</a>
			      			<br/>
			      			Stars : {this.state.display[this.state.repoNumberForDetailedDisplay]["stars"]}
			      			<br/>
			      			Watches : {this.state.display[this.state.repoNumberForDetailedDisplay]["watches"]}
			      			<br/>
			      			Forks : {this.state.display[this.state.repoNumberForDetailedDisplay]["forks"]}
			      			<br/>
			      			Score : {this.state.display[this.state.repoNumberForDetailedDisplay]["score"]}
			      			<br/>
			      		</div>
			      	</div>
		      </div>
		    );
  		}
  	}
}
