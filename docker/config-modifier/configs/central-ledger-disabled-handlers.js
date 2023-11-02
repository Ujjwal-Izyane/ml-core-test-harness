module.exports = {
  "HOSTNAME": "http://central-ledger",
  "DATABASE": {
    "HOST": "10.10.100.73"
  },
  "MIGRATIONS": {
    "DISABLED": true,
    "RUN_DATA_MIGRATIONS": true
  },
  "MONGODB": {
    "DISABLED": true,
    "HOST": "objstore",
    "PORT": 27017,
    "USER": "",
    "PASSWORD": "",
    "DATABASE": "mlos"
  },
  "HANDLERS": {
    "DISABLED": true,
    "API": {
        "DISABLED": false
    },
    "TIMEOUT": {
        "DISABLED": true,
        "TIMEXP": "*/15 * * * * *",
        "TIMEZONE": "UTC"
    }
  },
  "KAFKA": {
    "CONSUMER": {
      "BULK": {
        "PREPARE": {
          "config": {
            "rdkafkaConf": {
              "metadata.broker.list": "10.10.100.72:9092"
            }
          }
        },
        "PROCESSING": {
          "config": {
            "rdkafkaConf": {
              "metadata.broker.list": "10.10.100.72:9092"
            }
          }
        },
        "FULFIL": {
          "config": {
            "rdkafkaConf": {
              "metadata.broker.list": "10.10.100.72:9092"
            }
          }
        },
        "GET": {
          "config": {
            "rdkafkaConf": {
              "metadata.broker.list": "10.10.100.72:9092"
            }
          }
        }
      },
      "TRANSFER": {
        "PREPARE": {
          "config": {
            "rdkafkaConf": {
              "metadata.broker.list": "10.10.100.72:9092"
            }
          }
        },
        "GET": {
          "config": {
            "rdkafkaConf": {
              "metadata.broker.list": "10.10.100.72:9092"
            }
          }
        },
        "FULFIL": {
          "config": {
            "rdkafkaConf": {
              "metadata.broker.list": "10.10.100.72:9092"
            }
          }
        },
        "POSITION": {
          "config": {
            "rdkafkaConf": {
              "metadata.broker.list": "10.10.100.72:9092"
            }
          }
        }
      },
      "ADMIN": {
        "TRANSFER": {
          "config": {
            "rdkafkaConf": {
              "metadata.broker.list": "10.10.100.72:9092"
            }
          }
        }
      }
    },
    "PRODUCER": {
      "BULK": {
        "PROCESSING": {
          "config": {
            "rdkafkaConf": {
              "metadata.broker.list": "10.10.100.72:9092"
            }
          }
        }
      },
      "TRANSFER": {
        "PREPARE": {
          "config": {
            "rdkafkaConf": {
              "metadata.broker.list": "10.10.100.72:9092"
            }
          }
        },
        "FULFIL": {
          "config": {
            "rdkafkaConf": {
              "metadata.broker.list": "10.10.100.72:9092"
            }
          }
        },
        "POSITION": {
          "config": {
            "rdkafkaConf": {
              "metadata.broker.list": "10.10.100.72:9092"
            }
          }
        }
      },
      "NOTIFICATION": {
        "EVENT": {
          "config": {
            "rdkafkaConf": {
              "metadata.broker.list": "10.10.100.72:9092"
            }
          }
        }
      },
      "ADMIN": {
        "TRANSFER": {
          "config": {
            "rdkafkaConf": {
              "metadata.broker.list": "10.10.100.72:9092"
            }
          }
        }
      }
    }
  }
}
