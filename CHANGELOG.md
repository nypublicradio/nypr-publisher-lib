# nypr-publisher-lib Changelog
## 0.2.16
- [BUGFIX] Remove custom mirage serializer for buckets, as it breaks things when using a custom response.

## 0.2.15
- [BUGFIX] Add source_tags to stream serializer so isWNYC and isWQXR will work correctly on stream models
- [ENHANCEMENT] Add allowQueueing switch to story-tease
- [BUGFIX] Update ember-font-awesome
- [CHORE] Update some factories

## 0.2.14
- [BUGFIX] Protect against bucket attributes being missing and everything blowing up

## 0.2.13
- [ENHANCEMENT] Allow for multiple nav-links components in one page

## 0.2.12
- [ENHANCEMENT] Adds editLink to bucket model

## 0.2.11
- [ENHANCEMENT] #20 Adds story-credits component
- [ENHANCEMENT] Adds appearance-credit component
- [ENHANCEMENT] Adds music-credit component
- [ENHANCEMENT] #19 Adds download-link component
- [ENHANCEMENT] Adds embed-button component

## 0.2.10
- [ENHANCEMENT] Adds estimatedDuration attribute to story model

## 0.2.9
- [ENHANCEMENT] #17 Truncate episode teases with ember-truncate
- [ENHANCEMENT] #18 Add option to include logo and title for shows in episode-list

## 0.2.8
- [CHORE] bump nypr-ui

## 0.2.7
- [ENHANCEMENT] #15 show lede or bio in appearance list instead of just bio
- [BUGFIX] #16 Show appearance list images when width >= 800px instead of > 800px

## 0.2.6
- [ENHANCEMENT] #14 Let appearance-list accept a url for default image

## 0.2.5
- [CHORE] fix version typo

## 0.2.4
- [CHORE] versions nypr-django-for-ember and nypr-ui

## 0.2.3
- [ENHANCEMENT] Add person model, serializer, adapter
- [ENHANCEMENT] Add appearance model
- [ENHANCEMENT] Add appearance-list to api-response linkroll types
- [ENHANCEMENT] Add appearance-list component
- [ENHANCEMENT] Add socialLinks computed prop to appearances, people
- [ENHANCEMENT] Add social-iconlist component
- [ENHANCEMENT] Add option to hide people from about-page
- [BUGFIX] #13 Check for bucket items and add fake id if empty

## 0.2.2
- [BUGFIX] #10 Add donationUrl to channel attr
- [ENHANCEMENT] #11 Add canonicalHost to channel model

## 0.2.1
- [ENHANCEMENT] #5 Add studios image headers to channel model for studios show header
- [ENHANCEMENT] #6 Adds episode-list component + image-caption component
- [ENHANCEMENT] #7 Add url to channel model
- [ENHANCEMENT] #8 Add newsletterListId field to channel model
- [ENHANCEMENT] #9 Allow tests to fail on ember beta
- [BUGFIX] Fix build errors

## 0.2.0
- [ENHANCEMENT] Adds support for consuming apps to use mirage bits
- [ENHANCEMENT] Bumps nypr-audio-services to ~0.2.0

## 0.1.0
- [ENHANCEMENT] Bumps nypr-audio-services to ~0.1.0

## 0.0.2
- [ENHANCEMENT] Versions nypr-audio-services

## 0.0.1
- [ENHANCEMENT] Adds versioning
