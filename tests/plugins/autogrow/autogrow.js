/* bender-tags: editor, autogrow */
/* bender-ckeditor-plugins: autogrow */
/* bender-include: _helpers/tools.js */
/* global autogrowTools */

( function() {
	'use strict';

	bender.editor = {};

	bender.test( {
		// #4286
		'test autogrow': function() {
			if ( bender.env.ie && bender.env.version < 9 ) {
				assert.ignore();
			}

			var editor = this.editor,
				bot = this.editorBot;

			var html = '',
				initialEditorWidth = autogrowTools.getEditorSize( editor ).width,
				initialEditorHeight = autogrowTools.getEditorSize( editor ).height;

			for ( var i = 0; i < 8; i++ ) {
				html += '<p>test ' + i + '</p>';
			}

			bot.setData( html, function() {
				editor.once( 'afterCommandExec', function() {
					resume( function() {
						var editorWidth = autogrowTools.getEditorSize( editor ).width,
							editorHeight = autogrowTools.getEditorSize( editor ).height;

						assert.isTrue( editorHeight > initialEditorHeight, 'editor height should increase' );
						assert.areEqual( editorWidth, initialEditorWidth, 'editor width should not change' );
					} );
				} );

				editor.execCommand( 'autogrow' );
				wait();
			} );
		}
	} );
} )();
