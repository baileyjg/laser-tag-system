import { Component, OnInit, Input } from '@angular/core';

enum TransitionAnimationType {
  SlideLeft = "slide-left",
  SlideRight = "slide-right",
  FadeOut = "fade-out"
}

@Component({
  selector: 'app-transition-screen',
  templateUrl: './transition-screen.component.html',
  styleUrls: ['./transition-screen.component.css']
})

export class TransitionScreenComponent implements OnInit {

  windowWidth: string;
  screenTransition: string;
  opacityChange: number = 1;
  showTransition = true;

  @Input() animationDuration: number = 1;
  @Input() duration: number = 4;
  @Input() animationType: TransitionAnimationType = TransitionAnimationType.SlideRight;

  ngOnInit(): void {
    setTimeout(() => {
      let transitionStyle = "";
      switch (this.animationType) {
        case TransitionAnimationType.SlideLeft:
          this.windowWidth = "-" + window.innerWidth + "px";
          transitionStyle = "left " + this.animationDuration + "s";
          break;
        case TransitionAnimationType.SlideRight:
          this.windowWidth = window.innerWidth + "px";
          transitionStyle = "left " + this.animationDuration + "s";
          break;
        case TransitionAnimationType.FadeOut:
          transitionStyle = "opacity " + this.animationDuration + "s";
          this.opacityChange = 0;
      }

      this.screenTransition = transitionStyle;

      setTimeout(() => {
        this.showTransition = !this.showTransition;
      }, this.animationDuration * 1000);
    }, this.duration * 1000);
  }

}
