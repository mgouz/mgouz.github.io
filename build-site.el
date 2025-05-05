(require 'ox-publish)

(require 'package)
(setq package-user-dir (expand-file-name "./packages"))
(setq package-archives '(("melpa" . "https://melpa.org/packages/")
			 ("elpa" . "https://elpa.gnu.org/packages/")))

(package-initialize)
(unless package-archive-contents
  (package-refresh-contents))


;; Install Dependencies
(package-install 'htmlize)

(setq org-html-validation-link nil
      org-html-head-include-scripts nil ;; Remove default scripting
      org-html-head-include-default-style nil ;; Use our own styling 
      org-html-head "<link rel=\"stylesheet\" href=\"https://cdn.simplecss.org/simple.min.css\">")

(setq org-publish-project-alist
      (list
       (list "org-site:main"
	     :recursive t
	     :base-directory "./contents"
	     :publishing-directory "./public"
	     :publishing-function 'org-html-publish-to-html
	     :with-author nil
	     :with-creator t
	     :with-toc nil
	     :section-numbers nil
	     :time-stamp-file nil)))

(org-publish-all t)
(message "Build completed")
