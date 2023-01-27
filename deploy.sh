#!/bin/bash

set -e
mdbook build
aws --profile=inclination s3 sync --acl=public-read ./book/ s3://docs.pax.rs/
aws --profile=inclination cloudfront create-invalidation --distribution-id=E3NU993OXT9SZ2 --paths "/*"