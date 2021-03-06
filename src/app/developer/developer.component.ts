import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../profile.service";
import { Profile } from "../models/Profile";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { faGlobe, faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faLinkedin,
  faYoutube,
  faInstagram,
  faGithub
} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: "app-developer",
  templateUrl: "./developer.component.html",
  styleUrls: ["./developer.component.css"]
})
export class DeveloperComponent implements OnInit {
  profile: Profile;
  githubRepos: [any];
  faGlobe = faGlobe;
  faCheck = faCheck;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faLinkedin = faLinkedin;
  faYoutube = faYoutube;
  faInstagram = faInstagram;
  faGithub = faGithub;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    let userID = this.route.snapshot.paramMap.get("userid");

    this.profileService.getProfileByUserid(userID).subscribe(
      (res: Profile) => {
        this.profile = res;

        if (this.profile.githubusername) {
          this.profileService
            .getGithubRepos(this.profile.githubusername)
            .subscribe(
              (res: [any]) => {
                this.githubRepos = res;
              },
              (err: HttpErrorResponse) => {
                console.log(err);
              }
            );
        }

        this.isLoading = false;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }
}
