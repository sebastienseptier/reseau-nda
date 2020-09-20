import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post';
import { PostService } from '../../../services/post.service';
import { PaginationService } from '../../../services/pagination.service';
import { AuthService } from "../../../services/auth.service";
import { AlertService } from "../../../services/alert.service";

@Component({
	selector: 'app-list-post',
	templateUrl: './list-post.component.html',
	styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

	posts = {};
	pagedPosts: Post[];
	pagination: any = {};
	alertOptions = {
		autoClose: true,
		keepAfterRouteChange: true
	};

	constructor(private postService: PostService, private paginationService: PaginationService, protected alertService: AlertService) {}

	ngOnInit() {
		this.posts = this.postService.getPostList().subscribe(
			res => {
				console.log(this.posts);
			},
			err => {
				this.alertService.error('Impossible de récupérer les derniers posts.', this.alertOptions);
				console.log(err);
			},
		);
		//this.setPage(1);
	}

	/*setPage(page: number) {
        //récupère un objet pagination depuis le service
        this.pagination = this.paginationService.getPagination(this.posts.length, page, 3);
        //selectionne le contenu de la page actuelle
        this.pagedPosts = this.posts.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
    }*/
}