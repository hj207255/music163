$(function(){

	// 引入leancloud
	var APP_ID = 'wS0ILJoH4VTvPdX99Qy59Na2-gzGzoHsz';
	var APP_KEY = 'RINAYT0lB2AzFXRhSLwFqY8i';

	AV.init({
	  appId: APP_ID,
	  appKey: APP_KEY
	});
/*********************************导航栏***********************************/
	// 导航栏切换
	let $lis=$('.navbar-container>li')
	for(let i=0;i<$lis.length;i++){
		$lis.eq(i).on('click',function(e){
			let $li=$(e.currentTarget)
			let index=$li.index()
			$li.addClass('active')
				.siblings('.active').removeClass('active')
			$('.tab-content>li').eq(index).addClass('tabActive')
				.siblings('.tabActive').removeClass('tabActive')
		})
	}

/***********************首页从leancloud获取图片*******************************/
	var query = new AV.Query('images');
  	query.find().then(function (imgresponse){
  		// 在0-5中随机生成6个不重复数字
  		function randomsort(a, b) {
   			return Math.random()>.5 ? -1 : 1;
		}
		let imgarr = [0, 1, 2, 3, 4, 5];
		imgarr.sort(randomsort)

	  	let images=[]
  		for(let i=0;i<imgresponse.length;i++){
  			let $img=imgresponse[i].attributes
  			images.push($img)
  		}
  		for(let i=0;i<imgarr.length;i++){
  			let img=images[imgarr[i]]
  			let $liImg=$(`
  					<li>
  						<a href="./r-list.html?id=${img.id}">
							<img src="${img.bgurl}">
							<span>${img.bgtext}</span>
						</a>
					</li>
  				`)
  			$liImg.appendTo('.r-imgs')
			$('#recommendLoading').remove()
	  	}

  	})

/***********************首页从leancloud获取内容*******************************/
	// 使用leancloud获取歌曲列表
  	var query = new AV.Query('songs');
  	query.find().then(function (response) {
  		// 在0-15中随机生成10个不重复数字
	  	let arr=[]
	  	for(let j=0;j<10;j++){
  			for(let i=arr.length;i<10;i++){
				let count=parseInt(Math.random()*15)
		  		if(arr.indexOf(count)===-1){
		  			arr.push(count)
		  		}
	  		}
	  	}
	  	let arrhot=[]
	  	for(let j=0;j<10;j++){
  			for(let i=arrhot.length;i<10;i++){
				let count=parseInt(Math.random()*15)
		  		if(arrhot.indexOf(count)===-1){
		  			arrhot.push(count)
		  		}
	  		}
	  	}
	  	
  		// 首页歌曲列表
  		let newSongs=[]
  		for(let i=0;i<response.length;i++){
  			let $songs=response[i].attributes
  			newSongs.push($songs)
  		}

  		for(let i=0;i<arr.length;i++){
  			let song=newSongs[arr[i]]
  			let $li=$(`
				<div class="newest-row">
				<a href="./song.html?id=${song.id}">
					<div class="newest-row-1">
						<p class="newest-row1">${song.name}</p>
						<p class="newest-row2">
							<i class="sq ${song.sq}"></i>${song.author}-${song.album}
						</p>
					</div>
					<div class="newest-row-2"></div>
				</a>
				</div>
			`)
			$li.appendTo('.newest')
			$('#newestLoading').remove()
  		}

		// 热歌榜
		for(let i=0;i<arrhot.length;i++){
			let song=newSongs[arrhot[i]]
			let ranks=i<9?'0'+(i+1):(i+1)
			let $rank=$(`
				<div class="hot-row">
					<a href="./song.html?id=${song.id}">
						<span class="hot-left">
							<span class="hot-ranking">${ranks}</span>
							<div class="hot-row-1">
								<p class="hot-row1">${song.name}</p>
								<p class="hot-row2">
									<i class="sq  ${song.sq}"></i>${song.author}-${song.album}
								</p>
							</div>
						</span>
						<div class="hot-row-2"></div>
					</a>
				</div>
			`)
			$rank.appendTo('.hotcontent')
		}
  	})
	
/*********************************搜索页面***********************************/	
	// 搜索框获取焦点/失去焦点事件
	$('.input').focus(()=>{
		$('.input').val('')
		$('.icon.right').css('display','block')
	})
	$('.input').blur(()=>{
		$('.input').val('搜索歌曲、歌手、专辑')
		$('.icon.right').css('display','none')
	})
	let value=$('.input').val().trim()
	if(value==='搜索歌曲、歌手、专辑'){$('.search-content').empty()}

	// 从leancloud中获取搜索结果****************使用到函数节流
	let timeId=null
	$('.input').on('input',function(e){
		let value=$('.input').val().trim()
		if(value===''){$('.search-content').empty()}
		if(timeId){
			window.clearTimeout(timeId)
		}
		timeId=setTimeout(function(){
			timeId=null
			let $input=$(e.currentTarget)
			let value=$('.input').val().trim()
			if(value===''){return}
			var query1 = new AV.Query('songs');
	  		query1.contains('name', value);
	  		var query2 = new AV.Query('songs');
  			query2.equalTo('author', value);
  			var query = AV.Query.or(query1, query2);
	  		query.find().then(function(results){
	  			$('.search-content').empty()
	  			if(results.length===0){
	  				let $wu=$(`
	  						<li class="search-content-row">
		  						<span class="wu">没有结果<span>
	  						</li>
	  					`)
	  				$wu.appendTo('.search-content')
	  			}else{
	  				for(let i=0;i<results.length;i++){
	  					let songs=results[i].attributes
	  					let $li=$(`
	  						<li class="search-content-row">
		  						<a href="./song.html?id=${songs.id}">
		  							<svg class="icon scr" aria-hidden="true">
	    								<use xlink:href="#icon-search"></use>
									</svg>
		  							<span class="search-text">${songs.name}-${songs.author}</span>
		  						</a>
	  						</li>
	  					`)
	  					$li.appendTo('.search-content')
	  				}
	  			}
	  		})
		},300)
	})

})









// 传统方式从本地.json文件获取
	// $.get('./songs.json').then(function(response){
	// 	let $songs=response
	// 	$songs.forEach((i)=>{
	// 		let $li=$(`
	// 			<div class="newest-row">
	// 			<a href="./song.html?id=${i.id}">
	// 				<div class="newest-row-1">
	// 					<p class="newest-row1">${i.name}</p>
	// 					<p class="newest-row2">
	// 						<i class="sq"></i>${i.author}-${i.album}
	// 					</p>
	// 				</div>
	// 				<div class="newest-row-2"></div>
	// 			</a>	
	// 			</div>
	// 		`)
	// 		$li.appendTo('.newest')
	// 	})
	// 	$('#newestLoading').remove()
	// 	// 热歌榜
	// 	$songs.forEach((i)=>{
	// 		let ranks=i.id<10?'0'+i.id:i.id
	// 		let $rank=$(`
	// 			<div class="hot-row">
	// 				<a href="./song.html?id=${i.id}">
	// 					<span class="hot-left">
	// 						<span class="hot-ranking">${ranks}</span>
	// 						<div class="hot-row-1">
	// 							<p class="hot-row1">${i.name}</p>
	// 							<p class="hot-row2">
	// 								<i class="sq"></i>${i.author}-${i.album}
	// 							</p>
	// 						</div>
	// 					</span>
	// 					<div class="hot-row-2"></div>
	// 				</a>
	// 			</div>
	// 		`)
	// 		$rank.appendTo('.hotcontent')
	// 	})
	// })