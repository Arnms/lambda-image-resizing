# Lambda Image Resizing

AWS Lambda 기반 이미지 리사이징 서비스

## 📝 Overview

S3에 업로드된 이미지를 자동으로 리사이징하는 Serverless 함수입니다.  
실무에서 사용한 이미지 최적화 솔루션을 정리한 프로젝트입니다.

## ✨ Features

- ✅ 자동 이미지 리사이징 (썸네일 생성)
- ✅ S3 트리거 기반 자동 실행
- ✅ 다양한 이미지 포맷 지원
- ✅ 비용 효율적 (Serverless)

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Cloud:** AWS Lambda
- **Storage:** AWS S3
- **Image Processing:** Sharp

## 🏗 Architecture
```
S3 Upload → Lambda Trigger → Image Resize → S3 Save
```

1. 원본 이미지 업로드 (`uploads/`)
2. Lambda 자동 실행
3. 리사이징 처리 (Sharp)
4. 썸네일 저장 (`thumbnails/`)

## 🚀 Getting Started

### Prerequisites
```bash
AWS CLI 설정
Node.js >= 14.x
```

### Installation
```bash
# Clone
git clone https://github.com/Arnms/lambda-image-resizing.git

# Install
npm install
```

### Deployment
```bash
# Package
npm run build

# Deploy to Lambda
aws lambda create-function \
  --function-name image-resizing \
  --runtime nodejs14.x \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --role YOUR_LAMBDA_ROLE_ARN
```

### S3 Trigger Setup
```bash
# S3 버킷 이벤트 알림 설정
aws s3api put-bucket-notification-configuration \
  --bucket YOUR_BUCKET_NAME \
  --notification-configuration file://notification.json
```

## 📊 Performance

- **처리 시간:** ~200ms per image
- **메모리:** 512MB
- **비용:** 월 ~$1 (1만 리퀘스트 기준)

## 🎯 Why This Project?

### 실무 문제
커머스 플랫폼에서 사용자가 업로드한 이미지를  
다양한 크기로 제공해야 했습니다.

### 해결 방법
- S3 + Lambda로 자동화
- Sharp 라이브러리로 고품질 리사이징
- Serverless로 비용 최적화

### 성과
- 이미지 로딩 속도 50% 개선
- 월 인프라 비용 60% 절감
- 자동화로 운영 부담 제거

## 📝 Blog Post

- [AWS Lambda로 이미지 리사이징 자동화하기](링크)

## 👤 Author

**정인철 (Arnm)**
- GitHub: [@Arnms](https://github.com/Arnms)
- Email: dlscjf323@gmail.com
