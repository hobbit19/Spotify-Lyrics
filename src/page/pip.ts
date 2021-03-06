// https://w3c.github.io/picture-in-picture
// https://bugzilla.mozilla.org/show_bug.cgi?id=pip

const PIP_CONTAINER = '.navBar';

interface HTMLVideoElement {
  requestPictureInPicture: () => Promise<unknown>;
}

interface Document {
  pictureInPictureEnabled: boolean;
  pictureInPictureElement: HTMLVideoElement | null;
  exitPictureInPicture: () => Promise<void>;
}

if (!document.pictureInPictureEnabled) {
  document.pictureInPictureEnabled = true;

  HTMLVideoElement.prototype.requestPictureInPicture = function() {
    const container = document.querySelector(PIP_CONTAINER);
    if (container) {
      this.setAttribute('style', 'width: 100%;');
      container.append(this);
      document.pictureInPictureElement = this;
      return Promise.resolve();
    } else {
      throw Promise.reject(new Error());
    }
  };

  document.exitPictureInPicture = function() {
    document.pictureInPictureElement?.remove();
    document.pictureInPictureElement = null;
    return Promise.resolve();
  };
}
