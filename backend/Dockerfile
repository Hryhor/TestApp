# Stage 1 - build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ./CommentsApp ./CommentsApp
WORKDIR /src/CommentsApp
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# Stage 2 - runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# ✅ Устанавливаем libgdiplus для System.Drawing
RUN apt-get update && apt-get install -y \
    libgdiplus \
 && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/publish .
RUN mkdir -p /app/Uploads
ENTRYPOINT ["dotnet", "CommentsApp.dll"]
