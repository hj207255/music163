$(function(){
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

	$.get('./songs.json').then(function(response){
		let $songs=response
		$songs.forEach((i)=>{
			let $li=$(`
				<div class="newest-row">
				<a href="./song.html?id=${i.id}">
					<div class="newest-row-1">
						<p class="newest-row1">${i.name}</p>
						<p class="newest-row2">
							<i class="sq"></i>${i.author}-${i.album}
						</p>
					</div>
					<div class="newest-row-2"></div>
				</a>	
				</div>
			`)
			$li.appendTo('.newest')
		})
		$('#newestLoading').remove()
		// 热歌榜
		$songs.forEach((i)=>{
			let ranks=i.id<10?'0'+i.id:i.id
			let $rank=$(`
				<div class="hot-row">
					<a href="./song.html?id=${i.id}">
						<span class="hot-left">
							<span class="hot-ranking">${ranks}</span>
							<div class="hot-row-1">
								<p class="hot-row1">${i.name}</p>
								<p class="hot-row2">
									<i class="sq"></i>${i.author}-${i.album}
								</p>
							</div>
						</span>
						<div class="hot-row-2"></div>
					</a>
				</div>
			`)
			$rank.appendTo('.hotcontent')
		})
	})

	$('.input').focus(()=>{
		$('.input').val('')
		$('.icon.right').css('display','block')
	})
	$('.input').blur(()=>{
		$('.input').val('搜索歌曲、歌手、专辑')
		$('.icon.right').css('display','none')
	})

	// 引入leancloud
	var APP_ID = 'wS0ILJoH4VTvPdX99Qy59Na2-gzGzoHsz';
	var APP_KEY = 'RINAYT0lB2AzFXRhSLwFqY8i';

	AV.init({
	  appId: APP_ID,
	  appKey: APP_KEY
	});

	let timeId=null
	$('.input').on('input',function(e){
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
	  				$('.search-content').html('没有结果')
	  			}else{
	  				for(let i=0;i<results.length;i++){
	  					let songs=results[i].attributes
	  					console.log(songs)
	  					let $li=$(`
	  						<li data-id='${songs.objectId}'>
	  							<a href="./song.html?id=${songs.id}">
	  								${songs.name}-${songs.author}
	  							</a>
	  						</li>
	  					`)
	  					$li.appendTo('.search-content')
	  				}
	  			}
	  		})
		},500)
	})


})