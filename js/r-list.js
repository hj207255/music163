$(function(){

	// 引入leancloud
	var APP_ID = 'wS0ILJoH4VTvPdX99Qy59Na2-gzGzoHsz';
	var APP_KEY = 'RINAYT0lB2AzFXRhSLwFqY8i';

	AV.init({
	  appId: APP_ID,
	  appKey: APP_KEY
	});

/***********************首页从leancloud获取图片*******************************/
	var query = new AV.Query('images');
  	query.find().then(function (imgresponse){
  		//获取到地址栏中的id
		let id=location.search.match(/\bid=([^&]*)/)[1]

  		$('#imgLoading').remove()

  		let $imgz=imgresponse
		let $imgs=$imgz.filter((results)=>{return results.attributes.id===id})
		let $img=$imgs[0].attributes
		let $currentImg=$(`
				<div class="r-top-left">
					<img src="${$img.bgurl}">
				</div>
				<div class="r-top-right">${$img.bgtext}</div>
			`)
		$currentImg.appendTo('.r-top')

		$('.r-top').css('background-image','url('+$img.bgurl+')')
  	})

/***********************首页从leancloud获取内容*******************************/
	// 使用leancloud获取歌曲列表
  	var query = new AV.Query('songs');
  	query.find().then(function (response){
  		// 随机生成10个不重复数字
	  	let arr=[]
	  	for(let j=0;j<10;j++){
  			for(let i=arr.length;i<10;i++){
				let count=parseInt(Math.random()*15)
		  		if(arr.indexOf(count)===-1){
		  			arr.push(count)
		  		}
	  		}
	  	}
	  	// r-list列表
  		let newSongs=[]
  		for(let i=0;i<response.length;i++){
  			let $songs=response[i].attributes
  			newSongs.push($songs)
  		}
  		for(let i=0;i<arr.length;i++){
  			let song=newSongs[arr[i]]
  			let ranks=i<9?'0'+(i+1):(i+1)
  			let $li=$(`
				<div class="lists-row">
					<a href="./song.html?id=${song.id}">
						<span class="lists-left">
							<span class="lists-ranking">${ranks}</span>
							<div class="lists-row-1">
								<p class="lists-row1">${song.name}</p>
								<p class="lists-row2">
									<i class="sq"></i>${song.author}-${song.album}
								</p>
							</div>
						</span>
						<div class="lists-row-2"></div>
					</a>
				</div>
			`)
			$li.appendTo('.lists')
			// $('#newestLoading').remove()
  		}
	})
})