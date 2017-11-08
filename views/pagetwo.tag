<pagetwo>
	<div class='card'>
		<div class='content'>
			<div class='form'>
				<div class='title'>To Do App</div>
				<input type='text' ref='nameInput' required autofocus/>
				<input type='button' value='Add' onclick={ addItem } />
			</div>
			<ul class='todolist'>
				<li each = { name, i in todolist } onclick={ removeItem }>{ name }</li>
			</ul>
		</div>
		<div class="content right-align">
				<input type='button' onclick={ clearAll } value='Clear All'/>
			<input type='button' onclick={ goToFirstPage } value='Return to page 1'/>
		</div>
	</div>
	<style type='scss'>
		@import 'styles/pagetwo';
	</style>
	<script src="presenters/pagetwo.js"></script>
</pagetwo>