#!/bin/bash

set -e
mdbook build
aws --profile=inclination s3 sync --acl=public-read ./book/ s3://docs.pax.dev/
aws --profile=inclination cloudfront create-invalidation --distribution-id=E2EYK7TMGOPCYY --paths "/*"