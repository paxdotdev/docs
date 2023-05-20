#!/bin/bash

set -e
mdbook build
aws --profile=pax s3 sync --acl=public-read ./book/ s3://docs.pax.dev/
aws --profile=pax cloudfront create-invalidation --distribution-id=E2EYK7TMGOPCYY --paths "/*"