<pagetwo>
	<div class='card'>
		<div class='content'>
			<div class='form'>
				<div class='title'>To Do</div>
				<ul class='todolist'>
					<li each = { name, i in todolist } onclick={ removeItem }>{ name }</li>
				</ul>
				<img src='assets/img/empty.svg' class='empty' if={ !containsItem } />
				<input type='text' ref='nameInput' required placeholder='Add item' autofocus/>
				<input type='button' class='add-btn' value='+' onclick={ addItem } />
			</div>
		</div>
		<div class="content right-align buttons">
				<input type='button' onclick={ clearAll } value='Clear All'/>
			<input type='button' onclick={ goToFirstPage } value='Return to page 1'/>
		</div>
	</div>
	<style type='scss'>
		@import 'styles/pagetwo';
	</style>
	<script src="presenters/pagetwo.js"></script>
</pagetwo>